<template>
    <div class="p-4 md:p-6 lg:p-8">
        <div class="max-w-md mx-auto bg-white shadow-md rounded-md">
            <div class="p-4">
                <div v-for="message in messages" :key="message._id" class="mb-4">
                    <div class="font-bold">{{ message.user }} em {{ new Date(message.date).toLocaleDateString() }}:
                    </div>
                    <div>{{ message.text }}</div>
                </div>
                <input v-model="newMessage.user" placeholder="Nome"
                    class="border p-2 w-full mb-2 md:w-3/4 lg:w-2/3 xl:w-1/2" />
                <textarea v-model="newMessage.text" placeholder="Texto"
                    class="border p-2 w-full mb-2 md:w-3/4 lg:w-2/3 xl:w-1/2"></textarea>
                <button @click="sendMessage" class="bg-blue-500 text-white p-2 rounded">Enviar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const messages = ref([]);
const newMessage = ref({ user: '', text: '' });

const fetchMessages = async () => {
    const response = await fetch('http://localhost:5000/api/message/');
    messages.value = await response.json();
};

const sendMessage = async () => {
    const response = await fetch('http://localhost:5000/api/message/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage.value),
    });
    const message = await response.json();
    messages.value.unshift(message);
    newMessage.value = { user: '', text: '' };
};

onMounted(fetchMessages);
</script>

<style scoped></style>