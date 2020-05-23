export interface Deserializable<T> {
    deserialize(item: any): T;
  }