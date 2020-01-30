const findAllSolutions = require('./boggle_solver');

describe("Testing Boogle Capabilities", () => {

  it("a dictionary with no solution and a grid, returns []", () => {
    const expected = [];
	expect(findAllSolutions([["V", "G"], ["H", "T"]],["K"])).toStrictEqual(expected);
  });
  it("Returns empty list if all arguments are passed empty", () => {
	const expected = [];
	expect(findAllSolutions([[], []],[])).toStrictEqual(expected);
  });
  it("(Numbers as Integers)Returns 132 if [[1, 2], [3, 4]] and [1, 2, 13, 131, 132, 45] passed as arguments", () => {
	const expected = [];
	expect(findAllSolutions([[1, 2], [3, 4]],[1, 2, 13, 131, 132, 123, 45])).toStrictEqual(expected);
  });
  it("Does not re-use letters to form words", () => {
	const expected = [];
	expect(findAllSolutions([["A"], ["A"]],["AAA"])).toStrictEqual(expected);
  });
  it("given grid and dictionary as [A, B], [C, D]],[A, B, AC, ACA, ACB, DE], returns [ACB]", () => {
	const expected = ['ACB'];
	expect(findAllSolutions([["A", "B"], ["C", "D"]],["A", "B", "AC", "ACA", "ACB", "DE"])).toStrictEqual(expected);
  });
  it("given grid and dictionary as [A, B], [C, D]],[A, B, AC, ACA, ACB, DE], do return any wrong solution", () => {
	const expected = ['ACA'];
	expect(findAllSolutions([["A", "B"], ["C", "D"]],["A", "B", "AC", "ACA", "ACB", "DE"])).not.toStrictEqual(expected);
  });
 it("Returns a solution in the dictionary that has duplicate letters in the word", () => {
	const expected = [ 'ABEF', 'AFJIEB', 'DGKD' ];
	expect(findAllSolutions([["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["A", "B", "C", "D"]],["ABEF", "AFJIEB", "DGKD", "DGKA"])).toStrictEqual(expected);
  });
 it("(Numbers as Strings)Returns 132 if [[1, 2], [3, 4]] and [1, 2, 13, 131, 132, 45] passed as arguments", () => {
	const expected = ['132'];
	expect(findAllSolutions([["1", "2"], ["3", "4"]],["1", "2", "13", "131", "132", "45"])).toStrictEqual(expected);
  });
 it("given grid and dictionary as [Qu, B], [C, D]],[A, B, AC, ACA, QuCB, DE], returns [QuCB]", () => {
	const expected = ['QuCB'];
	expect(findAllSolutions([["Qu", "B"], ["C", "D"]],["A", "B", "AC", "ACA", "QuCB", "DE"])).toStrictEqual(expected);
  });
 it("(Numbers as Integers, Dictionary as strings )Returns 132 if [[1, 2], [3, 4]] and [1, 2, 13, 131, 132, 45] passed as arguments", () => {
	const expected = ["132"];
	expect(findAllSolutions([[1, 2], [3, 4]],["1", "2", "13", "131", "132", "45"])).toStrictEqual(expected);
  });
 it("(lowercase testing)given grid and dictionary as [a, b], [c, d]],[a, b, ac, aca, acb, de], returns [acb]", () => {
	const expected = ['acb'];
	expect(findAllSolutions([["a", "b"], ["c", "d"]],["a", "b", "ac", "aca", "acb", "de"])).toStrictEqual(expected);
  });
});
			

