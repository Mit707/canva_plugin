export const VIDEO_TYPE = [
  { id: 1, title: "URL mode", label: "url mode", view: "url-view" },
  { id: 2, title: "Form mode", label: "form mode", view: "form-view" },
  { id: 3, title: "Product mode", label: "product mode", view: "product-view" },
];

export const TABS = [
  { id: 1, title: "All" },
  { id: 2, title: "Male" },
  { id: 3, title: "Product mode" },
];
export const URL_REGEX = new RegExp(
  /^((ftp|http[s]?):\/\/(?:www\.|(?!www))[a-zA-Z0-9]+[a-zA-Z0-9]\.[^\s]{2,})/gi
);
export const FILES = {
  IMAGE_SIZE: 5,
};

export const FILETYPE = {
  image: ".png,.jpg,.jpeg,.gif",
};
export const PLUGIN_ID = "6db40302-9b4c-4d0d-9799-14c86d545574";
