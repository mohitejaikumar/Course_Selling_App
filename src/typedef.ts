export  interface CourseType {
  _id: string | null,
  title: string | null,
  description: string | null,
  imageLink: string | null,
  published: boolean | null,
  price: number | null,
  __v: number | null,
}
export interface UserType{
    isLoading : boolean,
    userEmail : string|null,
}