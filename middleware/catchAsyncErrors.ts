import { NextFunction, Request, Response } from "express";

export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    //Promise.resolve(theFunc(req, res, next)).catch(next);: Di dalam fungsi ini,
    // theFunc yang diberikan sebagai argumen dipanggil dengan req, res, dan next yang diteruskan ke dalamnya.
    // Hasil dari pemanggilan ini dibungkus dalam Promise.resolve(), yang akan mengubahnya menjadi janji (Promise).
    //Jika operasi asinkron dalam theFunc menghasilkan kesalahan, maka catch akan menangkapnya dan meneruskannya ke fungsi next,
    // yang akan memicu penanganan kesalahan global di Express.
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
