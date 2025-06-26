<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const name = ref('')
const email = ref('')
const pesan = ref('')

const saveData = async () => {
    const newPrh = JSON.stringify({
        name: name.value,
        email: email.value,
        pesan: pesan.value,
    })

    const response = await fetch("/api/prhs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nama: "test",
    email: "test@example.com",
    pesan: "ini pesan"
  })
});
    const data = await response.json()

    router.push('/')
}
</script>


<template>
    <h1>Buat PRH</h1>

     <form @submit.prevent="saveData">
        <div>
            <label>Nama</label>
            <input type="text" v-model="name">
        </div>
        <div>
            <label>Email</label>
            <input type="email" v-model="email">
        </div>
        <div>
            <label>Pesan</label>
            <textarea v-model="pesan"></textarea>
        </div>

        <div>
            <input type="submit">
        </div>
    </form>
</template>