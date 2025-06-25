<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter();

const route = useRoute()
const id = route.params.id

const name = ref('')
const email = ref('')
const pesan = ref('')

const saveData = async () => {
    const prh = JSON.stringify({
        name: name.value,
        email: email.value,
        pesan: pesan.value,
    })

    const response = await fetch(`/api/prhs/${id}`, {
        method:'PUT',
        body: prh,
    })
    const data = await response.json()

    router.push('/')
}

onMounted(() => {
    fetch(`/api/prhs/${id}`)
        .then(response => response.json())
        .then(data => {
            name.value = data.name
            email.value = data.email
            pesan.value = data.pesan
        })
})
</script>

<template>
    <h1>Edit PRH</h1>
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