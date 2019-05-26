export default{
  total:{
    "citysCount": 545,
    "flightCitysCount": 109,
    "airlinesCount": 45,
    "flightRoutesCount": 222,
    "flightsCount": 16822,
    "planeMarkersCount": 5,
    "trainCitysCount": 125,
    "railwaysCount": 11,
    "trainRoutesCount": 678,
    "trainsCount": 9921,
    "emuMarkersCount": 5
  },
  proportion:{
    "flight": [
      ["Boeing 738", "34.62"],
      ["Airbus 320", "24.04"],
      ["Bombardier CR9", "8.82"],
      ["Embraer 190", "5.56"],
      ["Boeing 737", "2.05"],
      ["Airbus 321", "1.82"],
      ["COMAC ARJ", "0.35"],
      ["Others", "22.74"]
    ],
    "train": [
      ["CRH2A统型", "33.16"],
      ["CRH380A统型", "15.34"],
      ["CRH380D统型", "13.55"],
      ["CRH380A型", "7.96"],
      ["CRH3C型", "6.43"],
      ["CRH380B统型", "5.75"],
      ["CRH3A型", "4.42"],
      ["Others", "13.39"]
    ]
  },
  potential:
  [
    ["贵阳", "52.66"],
    ["遵义", "46.19"],
    ["黔南", "16.56"],
    ["毕节", "16.55"],
    ["黔东南", "15.09"],
    ["安顺", "13.95"],
    ["铜仁", "13.32"],
    ["六盘水", "12.88"],
    ["黔西南", "11.87"]
  ],
  time:{
    "flight": {
      "count": 9128,
      "depOntimeRate": 75.55,
      "avgDelayTime": 27.75,
      "times": [64, 7, 13, 0, 0, 0, 152, 857, 739, 262, 554, 749, 490, 536, 355, 565, 633, 500, 443, 535, 572, 566, 321, 215]
    },
    "train": {
      "count": 6441,
      "depOntimeRate": 98.91,
      "avgDelayTime": 60,
      "times": [297, 0, 0, 0, 0, 0, 29, 284, 406, 358, 437, 663, 466, 492, 438, 288, 585, 610, 422, 296, 289, 81, 0, 0]
    }
  },
  flow:{
    "flight": {
      "depPlan": [1, 1, 0, 0, 0, 0, 3, 24, 20, 9, 15, 19, 12, 15, 10, 12, 18, 13, 13, 14, 15, 15, 11, 8],
      "arrPlan": [-11, -2, 0, 0, 0, 0, 0, -4, -8, -18, -16, -8, -17, -11, -13, -17, -10, -15, -16, -15, -13, -14, -13, -20],
      "depAct": [5, 3, 2, 1, 1, 0, 3, 16, 17, 11, 7, 13, 13, 15, 11, 10, 12, 14, 13, 11, 18, 9, 9, 10],
      "arrAct": [-9, -4, -4, -1, 0, -1, 0, -1, -7, -12, -11, -12, -14, -13, -9, -13, -13, -13, -13, -15, -13, -13, -14, -13]
    },
    "train": {
      "depPlan": [3, 0, 2, 5, 10, 7, 4, 16, 24, 31, 26, 48, 35, 43, 28, 37, 48, 39, 32, 18, 19, 11, 7, 2],
      "arrPlan": [-1, 0, -6, -9, -8, -3, 0, 0, -10, -18, -24, -34, -36, -36, -18, -35, -35, -35, -26, -19, -14, -12, -1, -2],
      "depAct": [6, 3, 5, 3, 8, 8, 7, 16, 23, 29, 26, 51, 35, 43, 27, 38, 48, 37, 31, 21, 18, 11, 7, 2],
      "arrAct": [-5, -1, -4, -8, -9, -5, -2, 0, -7, -18, -26, -35, -34, -37, -17, -37, -33, -34, -26, -20, -13, -10, -5, -3]
    }
  }
}
