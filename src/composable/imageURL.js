export const useImageURL = () => {
  const imageURL = (imageName, format) => {
    return new URL(`../assets/icons/${imageName}.${format}`, import.meta.url)
      .href
  }

  return {
    imageURL,
  }
}
