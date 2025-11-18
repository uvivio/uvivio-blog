const DevToolsWarning = () => (
  <div className="flex h-[50vh] w-full flex-col items-center justify-center px-4 text-center">
    <h2 className="text-xl font-semibold text-red-600">
      Oops! Something went wrong.
    </h2>
    <p className="mt-2 text-gray-600">
      For security reasons, this content is not available while developer tools
      are open.
    </p>
    <p className="mt-1 text-gray-500">
      Please close the developer tools and refresh the page.
    </p>
  </div>
);

export default DevToolsWarning;
