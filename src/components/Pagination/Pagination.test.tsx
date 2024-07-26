import {describe,expect,it} from 'vitest';
import {render,screen} from '@testing-library/react';
import Pagination from './Pagination';

const test_items = [
    'a','b','c','d','e','f','g','h','i','j','k',
    'l','m','n','o','p','q','r','s','t','u','v'
]

describe("Render Pagination",()=>{
    it("Test Pagination Component",()=>{
        render(<Pagination onChange={(arg:any)=>{
            let param = arg;
        }} items={test_items} isTest={true} />);
        screen.debug();
        expect(screen.getByTestId('test-page-container')).toBeTruthy();
        expect(screen.getAllByTestId('test-page-list').length).toBe(3);
    })
})