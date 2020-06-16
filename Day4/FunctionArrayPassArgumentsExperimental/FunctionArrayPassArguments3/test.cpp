#include <cstdint>
#include <cstdio>

extern "C" {
    void doubleValues(int16_t *, int);
}

void doubleValues (int16_t *buf, int bufSize) {
    for (int i=0; i<bufSize; i++) {
        buf[i] <<= 1;
    }
}