<script lang="ts">
  import { pb } from "./lib/pocketbase";

  async function SignUp() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement).value;

    const data = {
      username,
      email,
      emailVisibility: true,
      password: pass,
      passwordConfirm: pass,
    };

    const record = await pb.collection("users").create(data);
    const authData = await pb.collection("users").authWithPassword(username, pass);
  }

  async function Login() {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const pass = (document.getElementById("password") as HTMLInputElement).value;
    await pb.collection("users").authWithPassword(username, pass);
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

<div class="flex flex-col justify-center py-2">
  <div class="py-2">
    <input type="email" placeholder="Email" class="input input-bordered w-full max-w-xs" id="email" />
    <div class="py-1" />
    <input type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" id="username" />
    <div class="py-1" />
    <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" id="password" />
  </div>
  <div class="divider" />
  <div class="flex items-center btn-group btn-group-horizontal">
    <button class="btn glass btn-primary" on:click={SignUp}>Sign Up</button>
    <button class="btn glass btn-primary" on:click={Login}>Login</button>
  </div>
  <p id="error" class="text-red-400" />
</div>
