<template>
	<main class="text-center">
		<div v-for="u of user" :key="u.user_id">
			{{ u.username ? u.username : 'Welcome new user' }}
		</div>
	</main>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				user: [],
			};
		},
		async beforeCreate() {
			let token = localStorage.getItem('access_token');

			try {
				const res = await axios.post(
					'http://localhost:4000/main',
					{},
					{
						headers: {
							token,
						},
					}
				);
				if (res.status === 200 && res.data) {
					console.log(res.data);
				} else {
					localStorage.clear();
					location.href = '/login';
				}
			} catch (e) {
				localStorage.clear();
				location.href = '/login';
			}
		},
	};
</script>
