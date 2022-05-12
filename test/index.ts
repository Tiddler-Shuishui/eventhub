import EventHub from "../src";

type TestCase = (message: string) => void;

const test1: TestCase = message => {
    const eventHub = new EventHub();
    console.assert(eventHub instanceof Object === true, "eventHub 是个对象");
    console.log(message);
}

const test2: TestCase = message => {
    const eventHub = new EventHub();
    let called = false;
    eventHub.on("xxx", y => {
        called = true;
        console.assert(y === "我想说")
    });
    eventHub.emit("xxx", '我想说');
    console.assert(called);
    console.log(message);
}

const test3: TestCase = message => {
    const eventHub = new EventHub();
    let called = false;
    const fn1 = () => {
        console.log('fn1 执行了')
        called = true;
    };

    eventHub.on("yyy", fn1);
    eventHub.off("yyy", fn1);
    eventHub.emit("yyy");
    console.assert(called === false);
    console.log(message);
}

test1("eventHub 可以创建对象");
test2("eventHub .on 了之后， .emit 会触发 .on 的函数");
test3("eventHub .off 有用");