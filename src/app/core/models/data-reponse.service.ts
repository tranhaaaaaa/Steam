import {
  JsonObject,
  JsonProperty,
  Any,
  ValueCheckingMode,
} from 'json2typescript';
@JsonObject('DataResponse')
export class DataResponse {
  @JsonProperty('data', Any, true)
  data: any = undefined;
}
