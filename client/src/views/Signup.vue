<template>
	<div class="home pt-40">
		<h2 class="text-center text-2xl mb-28">New User</h2>
		<form
			class="w-1/4 mx-auto bg-gray-300 rounded-lg shadow-lg p-6"
			@submit.prevent="formSub"
		>
			<div class="w-full mb-6">
				<label class="block mb-2" for="username">Username</label>
				<input
					class="border-2 w-full outline-none py-1 px-3"
					v-model="username"
					type="text"
					name="username"
					required
					autocomplete="off"
					placeholder="Username..."
				/>
			</div>
			<div class="w-full mb-6">
				<label class="block mb-2" for="password">Password</label>
				<input
					class="border-2 w-full outline-none py-1 px-3"
					v-model="password"
					type="password"
					name="password"
					required
					autocomplete="off"
					placeholder="Password"
				/>
			</div>
			<div class="w-full mb-6">
				<label class="block mb-2" for="phone">Phone number</label>
				<input
					class="border-2 w-full outline-none py-1 px-3"
					v-model="phone"
					type="number"
					name="phone"
					required
					autocomplete="off"
					placeholder="Phone number"
				/>
			</div>
			<div class="flex justify-center mb-4">
				<button
					type="submit"
					class="bg-blue-400 py-1 px-3 rounded-lg shadow-lg"
				>
					Create
				</button>
			</div>
			<router-link class="text-purple-600" to="/login">
				Sign In
			</router-link>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'Home',
		data() {
			return {
				username: '',
				password: '',
				phone: '',
			};
		},
		methods: {
			async formSub() {
				let body = {
					username: this.username.toString(),
					password: this.password.toString(),
					phone: this.phone,
				};
				try {
					const { data } = await axios.post(
						'http://localhost:4000/signup',
						body
					);
					this.username = '';
					this.password = '';
					this.phone = '';
					console.log(data);

					if (data) {
						localStorage.setItem('access_token', data);

						location.href = '/main';
					}
				} catch (e) {
					console.log(e.message);
				}
			},
		},
	};
</script>
