import { supabase, isSupabaseConfigured } from './supabase';

// ── Calculate Numerology ─────────────
export function calculateNumerology(name, dob) {
  // Life Path: sum all digits of DOB
  const dateStr = String(dob || '').replace(/[^0-9]/g, '');
  let lifePathSum = dateStr
    .split('')
    .reduce((sum, d) => sum + (parseInt(d, 10) || 0), 0);

  // Reduce to single digit (except master numbers 11, 22, 33)
  while (lifePathSum > 9 && ![11, 22, 33].includes(lifePathSum)) {
    lifePathSum = String(lifePathSum)
      .split('')
      .reduce((s, d) => s + (parseInt(d, 10) || 0), 0);
  }

  // Destiny: Pythagorean numerology of name
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

  // Soul Urge: vowels only
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
  // Always update localStorage as immediate cache
  const localId = kundliData.id || 'kundli_' + Date.now();
  const localRecord = {
    id: localId,
    user_id: userId,
    ...kundliData,
    created_at: new Date().toISOString(),
  };
  localStorage.setItem('kundli_data', JSON.stringify(localRecord));
  localStorage.setItem('current_kundli_id', localId);

  if (!isSupabaseConfigured() || !userId) {
    return localRecord;
  }

  try {
    const { data, error } = await supabase
      .from('kundlis')
      .upsert({
        user_id: userId,
        ...kundliData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase saveKundli error, using local fallback:', error);
      return localRecord;
    }
    if (data?.id) {
      localStorage.setItem('current_kundli_id', data.id);
    }
    return data;
  } catch (err) {
    console.warn('Supabase saveKundli exception, using local fallback:', err);
    return localRecord;
  }
}

// ── Get User's Kundlis ───────────────
export async function getUserKundlis(userId) {
  if (!isSupabaseConfigured() || !userId) {
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
  if (!isSupabaseConfigured() || !kundliId) {
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
  if (!isSupabaseConfigured()) {
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
