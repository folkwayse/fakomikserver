import { html, raw } from "hono/html";
const Head = () => html`
  <head>
    <meta charset="UTF-8" />
    <title>FAKOMIK</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <meta
      name="description"
      content="Baca Manga Bahasa indonesia | Read Manga Online"
    />
    <head prefix="og: http://ogp.me/ns#">
      <meta property="og:type" content="article" />
      <!-- More elements slow down JSX, but not template literals. -->
      <meta property="og:title" content="" />
      <meta property="og:image" content="" />
    </head>
  </head>
  <body>
    <section>
      <!-- Container -->
      <div
        class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32"
      >
        <!-- Component -->
        <div class="flex flex-col items-center">
          <!-- Heading Div -->
          <div class="mb-8 max-w-[800px] text-center md:mb-12 lg:mb-16">
            <h2 class="mb-4 mt-6 text-3xl font-extrabold md:text-5xl">
              The latest and greatest news
            </h2>
            <p class="mx-auto mt-4 max-w-[528px] text-[#636262]">
              Lorem ipsum dolor sit amet elit ut aliquam
            </p>
          </div>
          <!-- Blog Content -->
          <div
            class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <!-- Blog Item -->
            <a
              href="https://neo-saas.webflow.io/blog-posts/7-things-about-web-design-your-boss-wants-to-know"
              class="flex max-w-full flex-col gap-4 rounded-md px-4 md:px-2"
            >
              <img
                alt=""
                src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb14a_image9.jpeg"
                class="inline-block h-60 w-full rounded-2xl object-cover"
              />
              <div
                class="flex h-full w-full flex-col items-start justify-around px-0 py-4"
              >
                <div class="mb-4 flex flex-col items-start gap-4">
                  <div class="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                    <p>Marketing</p>
                  </div>
                  <p class="text-xl font-bold md:text-2xl">
                    7 Things About Web Design Your Boss Wants To Know
                  </p>
                </div>
                <!-- Author -->
                <div
                  class="flex flex-col items-start md:flex-row lg:items-center"
                >
                  <p class="text-sm text-[#636262]">Laila Bahar</p>
                  <p class="ml-2 mr-2 hidden text-sm text-[#636262] md:block">
                    -
                  </p>
                  <p class="text-sm text-[#636262]">6 mins</p>
                </div>
              </div>
            </a>
            <!-- Blog Item -->
            <a
              href="https://neo-saas.webflow.io/blog-posts/7-of-the-best-examples-of-beautiful-blog-design"
              class="h-ax-w-full flex flex-col gap-4 rounded-md px-4 md:px-2"
            >
              <img
                alt=""
                src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb14e_image14.jpeg"
                class="inline-block h-60 w-full rounded-2xl object-cover"
              />
              <div
                class="flex h-full w-full flex-col items-start justify-around px-0 py-4"
              >
                <div class="mb-4 flex flex-col items-start gap-4">
                  <div class="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                    <p>Docs</p>
                  </div>
                  <p class="text-xl font-bold md:text-2xl">
                    7 of the Best Examples of Beautiful Blog Design
                  </p>
                </div>
                <!-- Author -->
                <div
                  class="flex flex-col items-start md:flex-row lg:items-center"
                >
                  <p class="text-sm text-[#636262]">Laila Bahar</p>
                  <p class="ml-2 mr-2 hidden text-sm text-[#636262] md:block">
                    -
                  </p>
                  <p class="text-sm text-[#636262]">6 mins</p>
                </div>
              </div>
            </a>
            <!-- Blog Item -->
            <a
              href="https://neo-saas.webflow.io/blog-posts/the-history-of-web-design"
              class="hmax-w-full flex flex-col gap-4 rounded-md px-4 md:px-2"
            >
              <img
                alt=""
                src="https://assets.website-files.com/646f6c0e32ec6f9ad7a4504c/646f6c1b66883bd637dfb144_image19.jpeg"
                class="inline-block h-60 w-full rounded-2xl object-cover"
              />
              <div
                class="flex h-full w-full flex-col items-start justify-around px-0 py-4"
              >
                <div class="mb-4 flex flex-col items-start gap-4">
                  <div class="rounded-md bg-[#f6ad1b] px-2 py-1.5">
                    <p>Payment</p>
                  </div>
                  <p class="text-xl font-bold md:text-2xl">
                    The History Of Web Design
                  </p>
                </div>
                <!-- Author -->
                <div
                  class="flex flex-col items-start md:flex-row lg:items-center"
                >
                  <p class="text-sm text-[#636262]">Laila Bahar</p>
                  <p class="ml-2 mr-2 hidden text-sm text-[#636262] md:block">
                    -
                  </p>
                  <p class="text-sm text-[#636262]">6 mins</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </body>
`;


export default Head;