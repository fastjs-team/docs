const introduction = {
  "text": "Introduction",
  "items": [
    {
      "text": "Description",
      "link": "/"
    },
    {
      "text": "Getting Started",
      "link": "/guide/getting-started"
    }
  ]
}

export default {
  "/v1.x/": [
    introduction,
    {
      "text": "Essentials",
      "items": [
        {
          "text": "Selecter",
          "link": "/v1.x/selecter"
        }
      ]
    }
  ],
  "/": [
    introduction,
    {
      "text": "Start Here",
      "items": [
        {
          "text": "v1.x",
          "link": "/v1.x/selecter"
        }
      ]
    }
  ]
}