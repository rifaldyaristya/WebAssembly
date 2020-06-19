#include <jni.h>
#include <string>

static jint fib(jint n){
    return n<=0 ? 0: n==1 ? 1 : fib(n-1) + fib(n-2);
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_example_hello_1cmake_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject/* this */,
        jint count) {
//    std::string hello = "";
//    for(jint i=0; i<count; i++){
//        hello += "Hello";
//    }
    jint res = fib(count);
    char buf[64];
    sprintf(buf, "%d", res);
    return env->NewStringUTF(buf);
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_example_hello_1cmake_MainActivity_hiAgain(
        JNIEnv* env,
        jobject){
    std::string helloAgain = "Jajaja";
    return env->NewStringUTF(helloAgain.c_str());
}

