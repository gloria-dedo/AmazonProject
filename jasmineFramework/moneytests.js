
import {formatCurrency} from "../scripts/utils/money.js";

//creating a test suite
describe('test suite: format Currency', () => {
    it('converts cents into dollars', () => {
        expect( formatCurrency(2095)).toEqual("20.95");
    });
    
    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });

    it('works with decimals', () => {
        expect(formatCurrency(2000.4)).toEqual("20.00");
    });
    
});
