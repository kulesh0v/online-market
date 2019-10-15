import {calculateScore} from "../components/learn/graphql/Ratings";
import {calculateWidths} from "../components/learn/graphql/Ratings";

describe('Calculate ratings', () => {
  test('should calculate score', () => {
    const testsData = [
      {
        input: [
          {rating: 1},
          {rating: 2},
          {rating: 3},
          {rating: 4},
          {rating: 5},
        ],
        output: "3.0",
      },
      {
        input: [
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
        ],
        output: "2.0",
      },
      {
        input: [
          {rating: 1},
          {rating: 1},
          {rating: 1},
          {rating: 1},
          {rating: 3}
        ],
        output: "1.4",
      },
      {
        input: [],
        output: '0',
      }
    ];

    testsData.forEach(test => {
      expect(calculateScore(test.input)).toBe(test.output);
    })
  });

  test('should calculate widths', () => {
    const testsData = [
      {
        input: [
          {rating: 1},
          {rating: 2},
          {rating: 3},
          {rating: 4},
          {rating: 5},
        ],
        output: [20, 20, 20, 20, 20],
      },
      {
        input: [
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
          {rating: 2},
        ],
        output: [0, 100, 0, 0, 0],
      },
      {
        input: [
          {rating: 1},
          {rating: 1},
          {rating: 1},
          {rating: 1},
          {rating: 2},
          {rating: 4},
          {rating: 5},
          {rating: 5},
        ],
        output: [50, 12.5, 0, 12.5, 25],
      },
      {
        input: [],
        output: [0, 0, 0, 0, 0],
      },
    ];

    testsData.forEach(test => {
      expect(calculateWidths(test.input)).toStrictEqual(test.output);
    })
  })
});