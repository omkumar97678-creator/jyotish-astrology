import { supabase, isSupabaseConfigured } from './supabase';

const isUUID = (str) =>
  typeof str === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);

// ── Calculate Numerology ─────────────
export function calculateNumerology(name, dob) {
  const dateStr = String(dob || '').replace(/[^0-9]/g, '');
  let lifePathSum = dateStr
    .split('')
    .reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);

  while (lifePathSum > 9 && ![11, 22, 33].includes(lifePathSum)) {
    lifePathSum = String(lifePathSum)
      .split('')
      .reduce((s, d) => s + (parseInt(d, 10) || 0), 0);
  }

  const letterValues = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };

  let destinySum = String(name || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .reduce((sum, l) => sum + (letterValues[l] || 0), 0);

  while (destinySum > 9 && ![11, 22, 33].includes(destinySum)) {
    destinySum = String(destinySum)
      .split('')
      .reduce((s, d) => s + (parseInt(d, 10) || 0), 0);
  }

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let soulSum = String(name || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .split('')
    .filter((l) => vowels.includes(l))
    .reduce((sum, l) => sum + (letterValues[l] || 0), 0);

  while (soulSum > 9 && ![11, 22, 33].includes(soulSum)) {
    soulSum = String(soulSum)
      .split('')
      .reduce((s, d) => s + (parseInt(d, 10) || 0), 0);
  }

  return {
    lifePathNumber: lifePathSum || 7,
    destinyNumber: destinySum || 3,
    soulUrgeNumber: soulSum || 9,
  };
}

// ── Save Kundli to Supabase ──────────
export async function saveKundli(userId, kundliData) {
  // Always update localStorage as immediate resilient cache
  const localId = kundliData.id || 'kundli_' + Date.now();
  const localRecord = {
    id: localId,
    user_id: isUUID(userId) ? userId : null,
    ...kundliData,
    created_at: new Date().toISOString(),
  };
  localStorage.setItem('kundli_data', JSON.stringify(localRecord));
  localStorage.setItem('current_kundli_id', localId);

  if (!isSupabaseConfigured()) {
    return localRecord;
  }

  try {
    // Check if user is authenticated in Supabase session
    let effectiveUserId = isUUID(userId) ? userId : null;
    if (!effectiveUserId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id && isUUID(user.id)) {
          effectiveUserId = user.id;
        }
      } catch {
        effectiveUserId = null;
      }
    }

    const payload = {
      user_id: effectiveUserId,
      name: kundliData.name || 'Seeker',
      date_of_birth: kundliData.date_of_birth || '1995-05-15',
      time_of_birth: kundliData.time_of_birth || null,
      time_unknown: Boolean(kundliData.time_unknown),
      birth_place: kundliData.birth_place || kundliData.birthPlace || 'New Delhi',
      latitude: kundliData.latitude || 28.6139,
      longitude: kundliData.longitude || 77.2090,
      timezone: kundliData.timezone || 'Asia/Kolkata',
      lagna: kundliData.lagna || 'Leo (Simha)',
      rashi: kundliData.rashi || 'Cancer (Karka)',
      nakshatra: kundliData.nakshatra || 'Pushya',
      gana: kundliData.gana || 'Manushya',
      planets: kundliData.planets || null,
      houses: kundliData.houses || null,
      panchang: kundliData.panchang || null,
      life_path_number: kundliData.life_path_number || 7,
      destiny_number: kundliData.destiny_number || 3,
      soul_urge_number: kundliData.soul_urge_number || 9,
      ai_report: kundliData.ai_report || null,
      is_default: Boolean(kundliData.is_default ?? true),
      updated_at: new Date().toISOString(),
    };

    if (isUUID(kundliData.id)) {
      payload.id = kundliData.id;
    }

    const { data, error } = await supabase
      .from('kundlis')
      .upsert(payload)
      .select()
      .single();

    if (error) {
      console.warn('Supabase saveKundli error, using local fallback:', error);
      return localRecord;
    }

    if (data?.id) {
      localStorage.setItem('current_kundli_id', data.id);
      localStorage.setItem('kundli_data', JSON.stringify({ ...localRecord, ...data }));
    }
    return data;
  } catch (err) {
    console.warn('Supabase saveKundli exception, using local fallback:', err);
    return localRecord;
  }
}

// ── Get User's Kundlis ───────────────
export async function getUserKundlis(userId) {
  if (!isSupabaseConfigured() || !userId || !isUUID(userId)) {
    const local = localStorage.getItem('kundli_data');
    return local ? [JSON.parse(local)] : [];
  }

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('getUserKundlis error, using local fallback:', err);
    const local = localStorage.getItem('kundli_data');
    return local ? [JSON.parse(local)] : [];
  }
}

// ── Get Single Kundli ────────────────
export async function getKundli(kundliId) {
  if (!isSupabaseConfigured() || !kundliId || !isUUID(kundliId)) {
    const local = localStorage.getItem('kundli_data');
    return local ? JSON.parse(local) : null;
  }

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .select('*')
      .eq('id', kundliId)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('getKundli error, using local fallback:', err);
    const local = localStorage.getItem('kundli_data');
    return local ? JSON.parse(local) : null;
  }
}

// ── Delete Kundli ────────────────────
export async function deleteKundli(kundliId) {
  if (!isSupabaseConfigured() || !isUUID(kundliId)) {
    localStorage.removeItem('kundli_data');
    localStorage.removeItem('current_kundli_id');
    return;
  }

  const { error } = await supabase
    .from('kundlis')
    .delete()
    .eq('id', kundliId);

  if (error) throw error;
}
