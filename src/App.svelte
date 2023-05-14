<script lang="ts">
  import { currentUser, pb } from "./lib/pocketbase";
  import Login from "./Login.svelte";
  import Messages from "./Messages.svelte";

  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <Messages />
{:else}
  <Login />
{/if}
