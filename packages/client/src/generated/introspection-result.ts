
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "CreateClientResponse": [
      "Client",
      "CreateClientResponseError"
    ],
    "Res": [
      "ResDelete",
      "ResFork",
      "ResHistory",
      "ResNormal",
      "ResTopic"
    ],
    "Token": [
      "TokenGeneral",
      "TokenMaster"
    ],
    "Topic": [
      "TopicFork",
      "TopicNormal",
      "TopicOne"
    ],
    "TopicSearch": [
      "TopicNormal",
      "TopicOne"
    ]
  }
};
      export default result;
    