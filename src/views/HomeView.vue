<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Prh {
  id: string
  nama: string
  email: string
  pesan: string
}

const prhs = ref<Prh[]>([])

const fetchPrhs = async () => {
  const response = await fetch('/api/prhs')
  const data = await response.json()
  prhs.value = data
}

onMounted(() => {
  fetchPrhs()
})

const removePrh = async (id: string) => {
  const response = await fetch(`/api/prhs/${id}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    fetchPrhs()
  }
}
</script>

<template>
  <main>
    <div>Daftar PRH</div>
    <div>
      <RouterLink to="/prh">Buat PRH</RouterLink>
    </div>
    <div>
      <ul>
        <li v-for="prh in prhs" :key="prh.id">
          <div>{{ prh.nama }}</div>
          <div>{{ prh.email }}</div>
          <div>{{ prh.pesan }}</div>
          <div>
            <RouterLink :to="`/prh/${prh.id}`">Edit</RouterLink>
          </div>
          <div>
            <button @click="removePrh(prh.id)">Hapus Data</button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>