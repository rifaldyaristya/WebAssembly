// Your First C++ Program

#include <iostream>


using namespace std;

// int* initiateMatrix(int row, int col){
//   const int matrixSize = row*col;
//   static int matrix[matrixSize];
//   for(int i=0; i<row; i++){
//     for(int j=0; j<col; j++){
//       matrix[i*row+col] = 0;
//     }
//   }
//   return (matrix);

// }

const int N = 3;

int** getArray(int row, int col){
  int** arr = new int*[row];
  for(int i=0; i<row; ++i){
    arr[i] = new int[col];
    for(int j=0; j<col; ++j){
      arr[i][j] = 0;
    }
  }

  return arr;

}

int main(){
  int ** p = getArray(2,3);
  for(int i=0; i<2; i++){
    for(int j=0; j<3; j++){
      cout << p[i][j];
    }
    cout << endl;
  }
  cout << "done";
  
}