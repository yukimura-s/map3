<script>
    import { onMount } from 'svelte';

    let map;
    let loggedIn = false;
    let email = '';
    let password = '';

    const correctEmail = 'test@example.com';
    const correctPassword = 'password123';

    function handleLogin() {
        if (email === correctEmail && password === correctPassword) {
            loggedIn = true;
        } else {
            alert('Invalid email or password');
        }
    }

    $: if (loggedIn) {
        initMap();
    }

    async function initMap() {
        const L = await import('leaflet');
        import('leaflet/dist/leaflet.css');

        map = L.map('map').setView([35.4753, 135.3829], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        const locations = [
            { latitude: 35.4753, longitude: 135.3829, timestamp: '2025-01-24 12:00:00' }
        ];

        const customIcon = L.icon({
            iconUrl: '/static/pin-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        locations.forEach((loc) => {
            L.marker([loc.latitude, loc.longitude], { icon: customIcon })
                .addTo(map)
                .bindPopup(`Timestamp: ${loc.timestamp}`);
        });
    }
</script>

<style>
    #map {
        height: 100vh;
        display: none;
    }

    #login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    #login input {
        margin: 5px;
        padding: 8px;
        font-size: 16px;
    }
</style>

{#if !loggedIn}
<div id="login">
    <h1>Login</h1>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={handleLogin}>Login</button>
</div>
{:else}
<div id="map" style="display: block;"></div>
{/if}
