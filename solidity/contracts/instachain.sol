// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract InstaChain {
    struct Post {
        uint256 id;
        string userId;
        string content;
        uint256 likeCount;
        uint256 createdAt;
    }

    uint256 private nextPostId = 1;

    mapping(uint256 => Post) public posts;

    event PostCreated(
        uint256 indexed id,
        string userId,
        string content,
        uint256 likeCount,
        uint256 createdAt
    );

    function createPost(string calldata userId, string calldata content)
        external
        returns (uint256)
    {
        require(bytes(userId).length > 0, "userId required");
        require(bytes(content).length > 0, "Content required");

        uint256 postId = nextPostId++;

        posts[postId] = Post({
            id: postId,
            userId: userId,
            content: content,
            likeCount: 0,
            createdAt: block.timestamp
        });

        emit PostCreated(postId, userId, content, 0, block.timestamp);

        return postId;
    }

    event PostLiked(
        uint256 indexed postId,
        uint256 newLikeCount
    );

    function likePost(uint256 postId) external {
        require(postId > 0, "Invalid post");

        Post storage post = posts[postId];
        post.likeCount++;

        emit PostLiked(
            postId,
            post.likeCount
        );
    }
}
