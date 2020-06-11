#include <emscripten.h>
#include <stdint.h>

EMSCRIPTEN_KEEPALIVE
int8_t* doubleValues (int8_t *buf, int bufSize) {

    int8_t values[bufSize];

    for (int i=0; i<bufSize; i++) {
        values[i] = buf[i] * 2;
    }

    auto arrayPtr = &values[0];
    return arrayPtr;
}
