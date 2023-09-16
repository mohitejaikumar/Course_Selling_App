import { atom } from "recoil";
import {CourseType} from "../../typedef.ts";
interface CourseDesType {
  isLoading: boolean;
  course: CourseType;
}
export const courseState = atom<CourseDesType>({
  key: "courseState",
  default: {
    isLoading: true,
    course: {
      _id: null,
      title: null,
      description: null,
      imageLink: null,
      published: null,
      price: null,
      __v: null,
    },
  },
});
