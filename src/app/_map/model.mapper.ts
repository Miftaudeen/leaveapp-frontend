export class ModelMapper<T> {
  propertyMapping: any;
  target: any;
     constructor(type: new() => T){
        this.target = new type();
        this.propertyMapping = this.target.constructor._propertyMap;
     }

     map(source){
       Object.keys(this.target).forEach((key) => {
         const mappedKey = this.propertyMapping[key];
         if (mappedKey){
           this.target[key] = source[mappedKey];
         }
         else {
           this.target[key] = source[key];
         }
       });
       Object.keys(source).forEach((key) => {
         const targetKeys = Object.keys(this.target);
         if (targetKeys.indexOf(key) === -1){
           this.target[key] = source[key];
         }
       });
       return this.target;
     }
}
