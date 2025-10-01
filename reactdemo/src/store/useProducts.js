// src/store/useProducts.js
import { create } from 'zustand'

const KEY = 'adminProducts_v1'

// try to migrate from older keys (e.g., previous builds)
function migrateFromOldKeys() {
  try {
    const oldKeys = ['products-v2', 'products-v1', 'products-v1a']
    for (const k of oldKeys) {
      const raw = localStorage.getItem(k)
      if (raw) {
        const arr = JSON.parse(raw)
        if (Array.isArray(arr) && arr.length) {
          const migrated = arr.map(p => ({
            id: (p.id || p.name || p.title || 'item').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
            title: p.title || p.name || '',
            category: p.category || 'general',
            image: p.image || p.imageUrl || '',
            client: p.client || '',
            services: p.services || '',
            url: p.url || p.link || '',
            description: p.description || '',
            skills: p.skills || [],
            video: p.video || '',
            docs: p.docs || []
          }))
          localStorage.setItem(KEY, JSON.stringify(migrated))
          return migrated
        }
      }
    }
  } catch(e) { console.warn('migration failed', e) }
  return null
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
    const migrated = migrateFromOldKeys()
    if (migrated) return migrated
    return []
  } catch(e) {
    console.error('load store', e)
    return []
  }
}
function save(list){ try{ localStorage.setItem(KEY, JSON.stringify(list)) }catch(e){} }

export const useProducts = create((set, get) => ({
  items: load(),
  add: (p) => {
    const id = (p.id || p.title || 'item').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
    const payload = { ...p, id }
    const list = [...get().items, payload]
    save(list); set({ items: list })
    return id
  },
  update: (id, patch) => {
    const list = get().items.map(it => it.id === id ? { ...it, ...patch, id } : it)
    save(list); set({ items: list })
  },
  remove: (id) => {
    const list = get().items.filter(it => it.id !== id)
    save(list); set({ items: list })
  },
  getById: (id) => get().items.find(it => it.id === id),
  clearAll: () => { save([]); set({ items: [] }) }
}))
