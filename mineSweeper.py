field = [
  [True, False, True, True, False],
  [True, False, False, False, False],
  [False, False, False, False, False],
  [True, False, False, False, False],
]

class Solution:
    # Constructor, initializes input matrix, deconstructs click, find size of rows & columns 
    #Creates return matrix, initialized with -1's along with validation matrix filled with False's
    def __init__(self,matrix,click):
        self.matrix = matrix  # [[T F T T F]].... True = bomb, False = nobomb
        self.x = click[0]
        self.y = click[1]
        self.rows = len(self.matrix)
        self.cols = len(self.matrix[0])
        self.return_matrix = [[-1 for i in range(self.cols)] for i in range(self.rows)]
        self.visited = [[False for i in range(self.cols)] for i in range(self.rows)] 
        
        # All 8 possible adjacent squares and their corresponding coordinates 
    def get_adjacent_squares(self,x,y):
        adj = [[x-1,y-1],
               [x,y-1],
               [x+1,y-1],
               [x-1,y],
               [x+1,y],
               [x-1,y+1],
               [x,y+1],
               [x+1,y+1]
            ]
        return adj
       
       # Checks whether the coordinate or square is valid (in bounds)
    def inBoard(self,x,y):
        return x>=0 and x<self.rows and y>=0 and y<self.cols
    
    #loops through adjacent squares and checks whethere there is a mine there with the given coordinates
    #if there is a mine , increment the count to eventually popualte the return matrix with 
    def countMines(self,x,y):
        count = 0
        for square in self.get_adjacent_squares(x,y):
            if self.inBoard(square[0],square[1]) and self.matrix[square[0]][square[1]]==True:
                count +=1
        return count
            
    # If there are adjacent mines, populate the position in our return matrix with its corresponding digit 
    #Mark that the coordinate has been visited in our visitation matrix    
    def reveal(self,x,y):
        self.visited[x][y] = True
        n = self.countMines(x,y)
        if n!=0:
            self.return_matrix[x][y]=n
            return
        
        # If n is 0, then there are no adjacent mines, begin to propagate and check adjacent mines. Repeat process if n is 0 (no adjacent mines)
        #Recursive call , propagation. Does most of the leg work 
        #Checks whethere its inside the board, valid positioning and whether its been visited before 
        #If both are true, run reveal method and either populate with posotive > 0 digit or continue to propagate
        else:
            self.return_matrix[x][y]=0
            
            adj = self.get_adjacent_squares(x, y)
            
            for square in adj:
                if self.inBoard(square[0],square[1]) and not self.visited[square[0]][square[1]]:
                    self.reveal(square[0],square[1])
        return
    
    def play(self,x,y):
        self.reveal(x,y)
        return self.return_matrix
                         
test = Solution(field,click)
result = test.play(3,2)
print(result)