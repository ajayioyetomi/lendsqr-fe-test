import {describe,expect,it} from 'vitest';
import {render,screen} from '@testing-library/react';
import App from './App';

describe("App Render",()=>{
    it("Render App Component",()=>{
        render(<App />);
        screen.debug();
        expect(screen.getByTestId('test-header')).toBeTruthy();
    })
})