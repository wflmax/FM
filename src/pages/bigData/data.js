export default{
  total:{
    "citysCount": 525,
    "flightCitysCount": 103,
    "airlinesCount": 52,
    "flightRoutesCount": 216,
    "flightsCount": 11674,
    "planeMarkersCount": 4,
    "trainCitysCount": 103,
    "railwaysCount": 7,
    "trainRoutesCount": 716,
    "trainsCount": 9802,
    "emuMarkersCount": 5
  },
  proportion:{
    "flight": [
      ["Boeing 738", "41.54"],
      ["Airbus 320", "22.03"],
      ["Bombardier CR9", "0.6"],
      ["Embraer 190", "6.48"],
      ["Boeing 737", "1.59"],
      ["Airbus 321", "7.33"],
      ["Airbus 319", "2.52"],
      ["Others", "17.91"]
    ],
    "train": [
      ["CRH2A统型", "84.19"],
      ["CRH1A-A型", "6.17"],
      ["CRH380A统型", "4.74"],
      ["CRH3A型", "2.12"],
      ["CR400BF型", "0.65"],
      ["CRH380AL型", "0.49"],
      ["CR400AF型", "0.33"],
      ["Others", "1.31"]
    ]
  },
  potential:
  [
    ["桂林", "51.21"],
    ["南宁", "50.77"],
    ["北海", "28.21"],
    ["柳州", "26.71"],
    ["百色", "17.85"],
    ["贵港", "12.69"],
    ["贺州", "12.57"],
    ["来宾", "9.55"],
    ["梧州", "9.06"],
    ["玉林", "7.9"],
    ["钦州", "7.38"],
    ["防城港", "1.94"]
  ],
  time:{
    "flight": {
      "count": 6338,
      "depOntimeRate": 79.23,
      "avgDelayTime": 23,
      "times": [6, 9, 0, 0, 0, 0, 62, 484, 542, 293, 365, 535, 455, 206, 286, 457, 461, 290, 493, 410, 490, 197, 120, 177]
    },
    "train": {
      "count": 6806,
      "depOntimeRate": 99.53,
      "avgDelayTime": 54,
      "times": [330, 0, 0, 0, 0, 0, 57, 400, 391, 460, 464, 454, 420, 570, 400, 479, 472, 550, 430, 389, 241, 190, 83, 26]
    }
  },
  flow:{
    "flight": {
      "depPlan": [1, 1, 0, 0, 0, 0, 2, 12, 15, 8, 8, 12, 12, 4, 7, 16, 13, 8, 10, 10, 12, 4, 3, 4],
      "arrPlan": [-8, -5, 0, 0, 0, 0, 0, -1, -5, -7, -10, -11, -6, -12, -15, -11, -8, -11, -10, -11, -7, -4, -10, -12],
      "depAct": [1, 0, 0, 0, 0, 0, 3, 6, 13, 7, 8, 8, 10, 9, 2, 7, 12, 9, 8, 12, 10, 12, 4, 2],
      "arrAct": [-8, -3, 0, -1, 0, 0, 0, -1, -5, -8, -9, -10, -5, -13, -3, -11, -5, -12, -13, -11, -8, -3, -10, -4]
    },
    "train": {
      "depPlan": [0, 0, 0, 0, 0, 0, 7, 25, 28, 31, 36, 45, 43, 51, 39, 44, 45, 57, 42, 47, 22, 22, 15, 3],
      "arrPlan": [0, 0, 0, 0, 0, -2, -4, -10, -11, -23, -30, -30, -41, -35, -36, -34, -42, -50, -39, -41, -18, -20, -6, -2],
      "depAct": [2, 0, 0, 0, 0, 0, 7, 25, 28, 34, 32, 46, 43, 51, 39, 44, 45, 57, 42, 46, 23, 22, 15, 3],
      "arrAct": [0, 0, 0, 0, 0, -2, -2, -12, -10, -21, -31, -31, -38, -39, -36, -33, -43, -50, -37, -40, -19, -20, -7, -2]
    }
  }
}
