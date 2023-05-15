<script lang="ts">
  import { onMount } from "svelte";
  import { pb, currentUser } from "./lib/pocketbase";

  import Filter from "bad-words";

  let messages = [];
  let unsubscribe: () => void;
  onMount(async () => {
    const record = await pb.collection("messages").getList(1, 25, {
      sort: "created",
      expand: "user",
    });
    messages = record.items;
    unsubscribe = await pb.collection("messages").subscribe("*", async ({ action, record }) => {
      if (action === "create") {
        // Fetch associated user
        const user = await pb.collection("users").getOne(record.user);
        record.expand = { user };
        messages = [...messages, record];
      }
      if (action === "delete") {
        messages = messages.filter((m) => m.id !== record.id);
      }
    });
  });

  async function send() {
    const filter = new Filter();
    var send = (document.getElementById("send") as HTMLInputElement).value;
    if (send == null) {
      console.log("DONT BE A TARD");
    }
    const cleaned = filter.clean(send);
    const data = {
      user: $currentUser.id,
      message: cleaned,
    };

    const record = await pb.collection("messages").create(data);
    send = "";
  }
</script>

<div class="flex flex-col artboard phone-1 bg-zinc-800 shadow-xl rounded-xl space-x-1">
  <div class="overflow-auto">
    {#each messages as message}
      <div class="p-4 rounded-xl">
        <div class="flex">
          <img class="avatar" src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${message.expand?.user?.username}&radius=15`} alt="avatar" width="24px" height="24px" />
          <h2 class="text-left font-bold py-1 pl-2">{message.expand?.user?.username}</h2>
        </div>
        <p class="text-left">{message.message}</p>
      </div>
    {/each}
  </div>
  <div class="flex space-x-1">
    <input type="text" placeholder="Send message..." class="input input-bordered input-primary w-full max-w-xs align-bottom" id="send" />
    <button class="btn btn-active btn-primary btn-xl px-4" on:click={send}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26.552" height="26.553" viewBox="0 0 26.553 26.552" class="fill-white">
        <path
          id="Send-Icon-93ync3"
          d="M67.123,61.652a2.268,2.268,0,0,0-2.232-.6l-21.92,5.873a2.318,2.318,0,0,0-.59,4.225l9.3,5.56a1.091,1.091,0,0,1,.382.382L57.627,86.4a2.277,2.277,0,0,0,1.97,1.126,2.954,2.954,0,0,0,.336-.021,2.285,2.285,0,0,0,1.916-1.7l5.875-21.92a2.284,2.284,0,0,0-.6-2.235M43,70.113a1.08,1.08,0,0,1-.529-1.1,1.069,1.069,0,0,1,.811-.916L65.2,62.219a1.088,1.088,0,0,1,.608.021L52.265,75.65Zm17.682,15.38a1.1,1.1,0,0,1-2.017.282L53.122,76.5,66.558,63.2a1.1,1.1,0,0,1,0,.377Z"
          transform="translate(-41.254 -61)"
        />
      </svg>
    </button>
  </div>
</div>
