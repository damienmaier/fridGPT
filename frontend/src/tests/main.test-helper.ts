import { DebugElement, Type } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function click<T>(fixture: ComponentFixture<T>, testId: string) {
    const element = findElement(fixture,testId);
    element.triggerEventHandler('click', null);
}

export function write<T>(fixture: ComponentFixture<T>, testId: string, content: string) {
    const element = findElement(fixture,testId);
    element.nativeElement.value = content;
    element.nativeElement.dispatchEvent(new Event('input'));
}

export function findElement<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
    const debugElement = fixture.debugElement.query(
        By.css(`[test-id=\"${testId}\"]`)
    );
    if(debugElement === null) {
        throw new Error("the given id is not linked to any element in the template");
    }
    return debugElement;
}

export function findNthElement<T>(fixture: ComponentFixture<T>, querySelector: string, index: number): DebugElement {
    const items = findAllElements(fixture, querySelector);
    if(items.length < index) {
        throw new Error("the given index and query selector does not match to any element");
    }
    return items[index];
}

export function findAllElements<T>(fixture: ComponentFixture<T>, querySelector: string): DebugElement[] {
    const items = fixture.debugElement.queryAll(By.css(querySelector));
    if(items === null) {
        throw new Error("the given query selector does not match any element");
    }
    return items;
}

export function getContentFromId<T>(fixture: ComponentFixture<T>, testId: string): string {
    const element = findElement(fixture, testId);
    return element.nativeElement.textContent;
}

export function initFixture<T>(type: Type<any>): ComponentFixture<T> {
    let fixture:ComponentFixture<T> = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture;
}