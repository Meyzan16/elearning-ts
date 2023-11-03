
class ErrorHandler extends Error {
    statusCode: Number;

    constructor(message:any, statusCode:Number) { // Ini adalah konstruktor kelas ErrorHandler. Konstruktor ini menerima dua parameter: message dan statusCode. Parameter message dideklarasikan dengan tipe data any, yang berarti itu bisa menjadi tipe data apa pun. Parameter statusCode dideklarasikan dengan tipe data Number.
        super(message); //Pernyataan super ini memanggil konstruktor kelas Error yang mewarisi oleh ErrorHandler, dengan meneruskan nilai dari parameter message. Ini digunakan untuk mengatur pesan kesalahan yang akan disertakan dalam objek ErrorHandler.
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor); //Pernyataan ini digunakan untuk menangkap dan merekam tumpukan panggilan (stack trace) pada objek ErrorHandler. Ini akan membantu dalam pelacakan sumber kesalahan saat kesalahan terjadi.
    }
}

export default ErrorHandler;