<script>
  import { onMount, onDestroy } from "svelte";
  import { pb } from "./lib/pocketbase";

  let messages = [];
  onMount(async () => {
    const record = await pb.collection("messages").getFullList({
      sort: "-created",
    });
    messages = record;
    console.log(messages);
  });
</script>

{#each messages as messager}
  <div class="py-2">
    <h2 class="font-bold">{messager.user}</h2>
    <p class="text-left">{messager.message}</p>
  </div>
{/each}
