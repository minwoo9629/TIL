import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Pro118667 {
    static long target;
    static Queue<Integer> q1, q2;

    public static void main(String[] args) {
        int[] queue1 = {3, 2, 7, 2};
        int[] queue2 = {4, 6, 5, 1};
        System.out.println(solution(queue1, queue2));
    }

    public static int solution(int[] queue1, int[] queue2) {
        int answer = 0;
        init(queue1, queue2);
        long s1 = Arrays.stream(queue1).sum();
        long s2 = Arrays.stream(queue2).sum();
        target = (s1 + s2) / 2;
        int n = queue1.length;
        while (answer <= 2 * n) {
            while (s1 > s2) {
                int num = q1.poll();
                s1 -= num;
                q2.add(num);
                s2 += num;
                answer++;
            }
            while (s2 > s1) {
                int num = q2.poll();
                s2 -= num;
                q1.add(num);
                s1 += num;
                answer++;
            }
            if (s1 == s2 && s1 == target) {
                return answer;
            }
        }
        return -1;
    }

    private static void init(int[] queue1, int[] queue2) {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
        for (int i = 0; i < queue1.length; i++) {
            q1.add(queue1[i]);
            q2.add(queue2[i]);
        }
    }
}
