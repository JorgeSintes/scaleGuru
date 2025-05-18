<script>
  import { FooterIcon } from 'flowbite-svelte';
  import { LinkedinSolid, InstagramSolid, HomeSolid, GithubSolid } from 'flowbite-svelte-icons';
</script>

<footer
  class="mt-4 flex flex-col-reverse items-center gap-3 border-t-2 border-gray-300 p-4 md:p-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
>
  <p class="text-xs">🐢 Written and hosted by Jorge Sintes 🐢</p>
  <div class="mt-4 flex space-x-6 sm:justify-center md:mt-0 rtl:space-x-reverse">
    <FooterIcon href="https://github.com/JorgeSintes">
      <GithubSolid
        class="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.linkedin.com/in/jorge-sintes">
      <LinkedinSolid
        class="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.instagram.com/slidinyorch">
      <InstagramSolid
        class="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
      />
    </FooterIcon>
    <FooterIcon href="https://www.jorgesintes.xyz/">
      <HomeSolid class="h-8 w-8 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
    </FooterIcon>
  </div>
  <p class="align-right hidden text-right text-xs lg:block">
    Find this code on <a href="https://github.com/JorgeSintes/scaleGuru">GitHub</a>!
  </p>
</footer>
