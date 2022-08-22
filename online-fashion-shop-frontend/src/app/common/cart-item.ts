import { Product } from "./product";

export class CartItem {
    id: number=0
    userEmail: string = String(localStorage.getItem("userEmail"));
    cartId : number = Number(localStorage.getItem("cartId"));
    productId: number=0;
    productName: string="";
    productImageUrl: string="";
    productUnitPrice: number=0;

    productQuantity: number=0;

}
