(function () {
  chrome.storage.sync.get('delayValue', (items) => {
    const scriptElement = document.getElementById('__NEXT_DATA__');
    const jsonData = scriptElement?.textContent
      ? JSON.parse(scriptElement.textContent)
      : null;

    if (jsonData) {
      const nextPage =
        jsonData.props.pageProps.exercise.nextExercises[0]._webUrl;
      setTimeout(() => {
        window.location.href = nextPage;
      }, items.delayValue);
    }
  });
})();
