import DWG from '../src/index';
import { expect } from 'chai';

describe('Basic functionality, testing functions', () => {
  const graph = new DWG<number, string>();

  it('addVertex', done => {
    expect(graph.addVertex(2)).to.be.an.instanceof(DWG);
    expect(graph.addVertex(5)).to.be.an.instanceof(DWG);
    done();
  });

  it('vertexCount', done => {
    expect(graph.vertexCount).to.equal(2);
    done();
  });
  
  it('addEdge', done => {
    expect(graph.addEdge(2, 5, '2 -> 5')).to.be.an.instanceof(DWG);
    expect(graph.addEdge(5, 2, '5 -> 2')).to.be.an.instanceof(DWG);
    expect(() => graph.addEdge(1, 2, 'foo')).to.throw('First');
    expect(() => graph.addEdge(2, 3, 'bar')).to.throw('Second');
    done();
  });

  it('edgeCount', done => {
    expect(graph.edgeCount).to.equal(2);
    done();
  });

  it('has', done => {
    expect(graph.has(2)).to.be.true;
    expect(graph.has(5)).to.be.true;
    expect(graph.has(3)).to.be.false;
    done();
  });

  it('getEdges', done => {
    expect(graph.getEdges(2)).to.have.lengthOf(1);
    expect(graph.getEdges(2)[0]).to.have.members([5, '2 -> 5']).and.have.lengthOf(2);
    expect(graph.getEdges(5)).to.have.lengthOf(1);
    expect(graph.getEdges(5)[0]).to.have.members([2, '5 -> 2']).and.have.lengthOf(2);
    done();
  });

  it('find', done => {
    expect(graph.find(v => v === 2)).to.have.members([2]).and.have.lengthOf(1);
    expect(graph.find(v => v === 5)).to.have.members([5]).and.have.lengthOf(1);
    expect(graph.find(v => v === 1)).to.be.empty;
    done();
  });

  it('getWeight', done => {
    expect(graph.getWeight(2, 5)).to.equal('2 -> 5');
    expect(graph.getWeight(5, 2)).to.equal('5 -> 2');
    expect(() => graph.getWeight(1, 2)).to.throw('First');
    expect(() => graph.getWeight(2, 8)).to.throw('Second');
    done();
  });

  it('getAllVertices', done => {
    const list = graph.getAllVertices();
    expect(list).to.have.members([2, 5]).and.have.lengthOf(2);
    done();
  });

  it('removeEdge', done => {
    expect(() => graph.removeEdge(0, 2)).to.throw('First');
    expect(() => graph.removeEdge(2, 0)).to.throw('Second');
    expect(graph.removeEdge(2, 5)).to.be.true;
    expect(graph.getEdges(2)).to.be.empty;
    expect(graph.vertexCount).to.equal(2);
    expect(graph.edgeCount).to.equal(1);
    expect(graph.removeEdge(2, 5)).to.be.false;
    done();
  });

  it('removeVertex', done => {
    expect(graph.removeVertex(2)).to.be.true;
    expect(graph.removeVertex(2)).to.be.false;
    expect(graph.removeVertex(1)).to.be.false;
    expect(graph.vertexCount).to.equal(1);
    expect(graph.edgeCount).to.equal(0);
    done();
  });
});

describe('Edge cases (advanced)', () => {
  const graph = new DWG<number, string>();

  it('Overwriting edges', done => {
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2, 'foo');
    graph.addEdge(1, 2, 'bar');
    const edgeList = graph.getEdges(1);
    expect(edgeList).to.be.an('array').with.lengthOf(1);
    expect(edgeList[0]).to.have.members([2, 'bar']);
    expect(graph.edgeCount).to.equal(1);
    done();
  });

  it('Overwriting vertices', done => {
    graph.addVertex(2);
    expect(graph.getEdges(1)).to.be.empty;
    expect(graph.edgeCount).to.equal(0);
    expect(graph.vertexCount).to.equal(2);
    done();
  });
});