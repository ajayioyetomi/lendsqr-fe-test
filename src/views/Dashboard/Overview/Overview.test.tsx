import {describe,expect,it} from 'vitest';
import {render,screen} from '@testing-library/react';
import Overview from './Overview';

describe("Render Dashboard",()=>{
    it("Render Dashboard Component",()=>{
        render(<Overview  />);
        screen.debug();
        expect(screen.getByTestId('test-overview')).toBeTruthy();
    })
})