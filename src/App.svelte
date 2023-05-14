<script lang="ts">
  import { currentUser, pb } from "./lib/pocketbase";
  import Login from "./Login.svelte";

  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <div class="btn-group btn-group-vertical lg:btn-group-horizontal">
    <h1 class="flex justify-center btn btn-primary">ur signed in bbg</h1>
    <button class="flex justify-center btn btn-primary" on:click={signOut}>sign out</button>
  </div>
{:else}
  <Login />
{/if}
