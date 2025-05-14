<script>
  import { FooterIcon } from 'flowbite-svelte';
  import { LinkedinSolid, InstagramSolid, HomeSolid, GithubSolid } from 'flowbite-svelte-icons';
</script>

<footer
  class="flex flex-col-reverse items-center gap-2 rounded-lg bg-white p-4 shadow md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:justify-between md:p-6 dark:bg-gray-800"
>
  <p class="text-xs">🐢 Written and hosted by Jorge Sintes 🐢</p>
  <div class="mt-4 flex space-x-6 sm:justify-center md:mt-0 rtl:space-x-reverse">
    <FooterIcon href="https://github.com/JorgeSintes">
      <GithubSolid
        class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.linkedin.com/in/jorge-sintes">
      <LinkedinSolid
        class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.instagram.com/slidinyorch">
      <InstagramSolid
        class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.jorgesintes.xyz/">
      <HomeSolid class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
    </FooterIcon>
  </div>
  <p class="align-right hidden text-right text-xs md:block">
    Find this code on <a href="https://github.com/JorgeSintes/scaleGuru">GitHub</a>!
  </p>
</footer>
