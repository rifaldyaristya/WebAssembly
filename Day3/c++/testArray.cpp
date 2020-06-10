#include <iostream>

using namespace std;

int* getArr(){
  return new int[3]{1,2,3};
}

int main(){
  int* p = getArr();
  for(int i=0; i<3; i++){
    cout << p[i];
  }

}