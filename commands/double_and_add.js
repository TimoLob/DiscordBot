function mod(n, m) {
    return ((n % m) + m) % m;
};

function inverse(a, b) {
    
    let u = 1;
    let v = 0;
    let s = 0;
    let t = 1;

    while(b!=0) {
        let q=Math.floor(a/b);
        let _a = a;
        let _b = b;
        let _u = u;
        let _s = s;
        let _v = v;
        let _t = t;


        a = _b;
        b = _a-q*_b;
        u = _s;
        s = _u-q*_s;
        v = _t;
        t = _v-q*_t;
    }
    return u;
};

class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    equals(P2) {
        return (this.x == P2.x && this.y == P2.y);
    }
};

class ECC {
    constructor(a,b,p) {
        this.a = a;
        this.b = b;
        this.p = p;
    }

    double(P) {
        let x1 = P.x;
        let y1 = P.y;
        if (x1==Infinity) {
            return new Point(Infinity,Infinity);
        }
        let s_num = mod(3*x1*x1+this.a,this.p);
        let s_den = mod(2*y1,this.p);

        if (s_den == 0)
            return new Point(Infinity,Infinity);
        let s_den_inv = inverse(s_den,this.p);
        let s = mod(s_num * s_den_inv,this.p);

        let x3 = mod(s*s-x1-x1,this.p);
        let y3 = mod(s*(x1-x3)-y1,this.p);
        let P3 = new Point(x3,y3);
        return P3;
    }

    add(P1,P2) {
        let x1 = P1.x;
        let y1 = P1.y;
        let x2 = P2.x;
        let y2 = P2.y;

        if(x1==Infinity) {
            return new Point(x2,y2);
        }
        else if(x2==Infinity){
            return new Point(x1,y1);
        }
        if(P1.equals(P2)) {
            return this.double(P1);
        }
        let s_num = mod(y2-y1,this.p);
        let s_den = mod(x2-x1,this.p);
        if(s_den == 0)
            return new Point(Infinity,Infinity);
        let s_den_inv = mod(inverse(s_den,this.p),this.p);
        let s = mod(s_num*s_den_inv,this.p);
        let x3 = mod(s*s-x1-x2,this.p);
        let y3 = mod(s*(x1-x3)-y1,this.p);
        let P3 = new Point(x3,y3);
        return P3;
    }
}


module.exports = {
	name: 'double_add',
	description: 'Calculates x^y mod m',
	usage: '!double_add a b p x y d\nBerechnet d*(x,y) auf E: y^2=x^3+ax+b mod p',
	hidden: false,
	execute(message, args) {
		if (args.length!=6) {
			// Or msg.reply() to @ the user
			message.channel.send("!double_add a b p x y d\nBerechnet d*(x,y) auf E: y^2=x^3+ax+b mod p");
		}
		else {
            let response = "";
            let a = parseInt(args[0]);
            let b = parseInt(args[1]);
            let p = parseInt(args[2]);
            let x = parseInt(args[3]);
            let y = parseInt(args[4]);
            let d = parseInt(args[5]);
            let d_bin = d.toString(2);
            const E = new ECC(a,b,p);
            let P = new Point(x,y);
            let T = P;
            
            response += `E: y^2 = x^3 +${a}x+${b} mod ${p}\n`;
            response += `Berechne ${d}\\*${P}\n`;

            response+=`1 | ${P}\n`;
            for(let i=1;i<d_bin.length;i++) {
                let d_i = d_bin.substring(i,i+1);
                response+=`${d_i} | ${T}+${T}`;
                T = E.double(T);
                if(d_i=="1") {
                    response+=`+${P}`;
                    T = E.add(T,P);
                    response+=`=${T} double+add\n`;
                }
                else {
                    response+=`=${T} double\n`;
                }
            }
            response+=`${d}*${P} = ${T}`;
            message.channel.send(response);
		}
	},
};