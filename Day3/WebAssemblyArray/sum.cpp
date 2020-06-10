int8_t* doubleValues () {

    int8_t values[3];

    values = new int8_t([1,2,3]);

    auto arrayPtr = &values[0];
    return arrayPtr;
}