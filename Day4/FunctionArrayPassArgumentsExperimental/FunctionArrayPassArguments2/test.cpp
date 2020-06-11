#include <cstdint>
#include <cstdio>

extern "C" {
    void doubleValues(int8_t *, int);
}

void doubleValues (int8_t *buf, int bufSize) {
    for (int i=0; i<bufSize; i++) {
        buf[i] <<= 1;
    }
}